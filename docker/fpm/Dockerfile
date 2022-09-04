FROM php:8.0.2-fpm

WORKDIR /var/www/laravel-docker

RUN apt-get update && apt-get install -y curl git zip zlib1g-dev libzip-dev unzip \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo pdo_mysql zip \
    && php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer