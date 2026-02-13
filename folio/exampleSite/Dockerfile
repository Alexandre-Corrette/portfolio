# ============================================================================
# Multi-stage build : Hugo → Nginx
# Usage :
#   docker build -t folio .
#   docker run -p 8080:80 folio
# ============================================================================

# — Stage 1 : Build
FROM hugomods/hugo:exts-0.128.0 AS builder
WORKDIR /src
COPY .. /src
WORKDIR /src/exampleSite
RUN hugo --minify --themesDir ../..

# — Stage 2 : Serve
FROM nginx:1.27-alpine
COPY --from=builder /src/exampleSite/public /usr/share/nginx/html
COPY exampleSite/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
