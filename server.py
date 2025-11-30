#!/usr/bin/env python3
import http.server
import socketserver
import os
import json
from urllib.parse import urlparse, parse_qs, quote

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # If requesting root, serve index.html
        if path == '/' or path == '':
            self.path = '/index.html'
        
        # Call the parent method to handle the request
        return super().do_GET()

    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        if path == '/api/checkout':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length).decode('utf-8') if length > 0 else '{}'
                data = json.loads(body or '{}')

                title = data.get('title', 'Presente')
                amount = max(100, int(round(float(data.get('amount', 0)) * 100)))
                order_id = str(data.get('order_id', '')) or str(int(os.times()[4]*1000))

                handle = os.environ.get('INFINITEPAY_HANDLE', 'werisder-bertoli')
                redirect_url = os.environ.get('INFINITEPAY_REDIRECT_URL', 'https://werisbertoli.github.io/convite-casamento/presentes.html')

                items_json = json.dumps([{ 'name': title, 'price': amount, 'quantity': 1 }])
                items_enc = quote(items_json, safe='')

                if handle and handle != 'SEU_HANDLE':
                    checkout_url = (
                        f"https://checkout.infinitepay.io/{handle}"
                        f"?items={items_enc}"
                        f"&redirect_url={quote(redirect_url, safe='')}"
                    )
                else:
                    params = {
                        'amount': str(amount),
                        'payment_method': 'credit',
                        'order_id': order_id,
                        'result_url': f"http://localhost:{8000}/presentes.html",
                        'app_client_referrer': 'CasamentoWeb',
                        'handle': handle,
                        'doc_number': os.environ.get('INFINITEPAY_DOC', 'SEU_CNPJ_SEM_PONTOS'),
                        'af_force_deeplink': 'true'
                    }
                    query = '&'.join([f"{k}={quote(str(v), safe='')}" for k, v in params.items()])
                    checkout_url = f"infinitepaydash://infinitetap-app?{query}"

                resp = {'checkout_url': checkout_url, 'order_id': order_id, 'title': title}
                payload = json.dumps(resp).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            except Exception as e:
                payload = json.dumps({'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"error":"not_found"}')
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    PORT = 8000
    
    # Change to the directory containing the files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Servidor rodando em http://localhost:{PORT}/")
        print(f"Página principal: http://localhost:{PORT}/")
        print(f"Painel administrativo: http://localhost:{PORT}/confirmados.html")
        print("Pressione Ctrl+C para parar o servidor")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor parado.")
            httpd.shutdown()