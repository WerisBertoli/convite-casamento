#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse

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