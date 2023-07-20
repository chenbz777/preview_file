FROM nginx

LABEL maintainer="chenbz"

RUN rm -rf /usr/share/nginx/html/index.html

COPY ./dist/ /usr/share/nginx/html/

EXPOSE 80