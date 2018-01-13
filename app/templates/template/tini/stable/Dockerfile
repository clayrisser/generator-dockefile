FROM alpine:3.7

LABEL image=<%= imageName %>:stable \
      maintainer="<%= authorName %> <<%= authorEmail %>> (<%= authorUrl %>)" \
      base=alpine:3.7

RUN apk add --no-cache \
      tini
RUN apk add --no-cache --virtual build-deps \
      build-base
RUN mkdir -p /usr/local/sbin && \
    touch /var/log/date.log

COPY stable /tmp

RUN mv /tmp/entrypoint.sh /usr/local/sbin/entrypoint.sh

WORKDIR /opt/<%= name %>

RUN apk del build-deps && \
    rm -rf /tmp/* /tmp/.* &>/dev/null || true

ENV HELLO=world

ENTRYPOINT ["tini", "--", "/bin/sh", "/usr/local/sbin/entrypoint.sh"]
CMD ["hello"]
