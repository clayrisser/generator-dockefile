FROM php:7.2.1-fpm-alpine3.7

LABEL image=<%= imageName %>:stable \
      maintainer="<%= authorName %> <<%= authorEmail %>> (<%= authorUrl %>)" \
      base=alpine:3.7

RUN apk add --no-cache \
      nginx \
      supervisor \
      tzdata && \
    mkdir -p /run/nginx
RUN apk add --no-cache --virtual build-deps \
      build-base
RUN docker-php-ext-install \
      opcache

COPY stable /tmp

RUN mv /tmp/entrypoint.sh /usr/local/sbin/entrypoint.sh && \
    mv /tmp/supervisord.conf /etc/supervisord.conf && \
    mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

COPY stable/index.php /var/www/html

RUN chown -R nobody:nobody /var/www/html && \
    find /var/www/html -type f -exec chmod 644 {} \; && \
    find /var/www/html -type d -exec chmod 755 {} \;

RUN apk del build-deps && \
    rm -rf /tmp/* /tmp/.* &>/dev/null || true

EXPOSE <%= port %>

ENV TZ=UTC

ENTRYPOINT ["/bin/sh", "/usr/local/sbin/entrypoint.sh"]
