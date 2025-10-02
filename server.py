#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Se a requisição for para a raiz (/), serve index.html
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        return super().do_GET()

PORT = 8000

with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
    print(f"Servidor rodando em http://localhost:{PORT}/")
    print(f"Página principal: http://localhost:{PORT}/")
    print(f"Painel administrativo: http://localhost:{PORT}/confirmados.html")
    httpd.serve_forever()