FROM nginx:1.19-perl

RUN apt-get update && apt-get install -y gettext-base vim

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf.template /etc/nginx/conf.d/

COPY dist /usr/share/nginx/html

COPY env_parse.sh /docker-entrypoint.d/000_env_parse.sh
RUN ["chmod", "+x", "/docker-entrypoint.d/000_env_parse.sh"]

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

