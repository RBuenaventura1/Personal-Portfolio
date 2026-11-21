FROM node:24-bookworm-slim AS node

FROM dunglas/frankenphp:1-php8.5-bookworm AS base

WORKDIR /app

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && install-php-extensions \
    bcmath \
    intl \
    mbstring \
    pdo_pgsql \
    pdo_sqlite \
    zip

FROM base AS build

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules

RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --no-scripts \
    --prefer-dist

COPY . .

RUN mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && composer dump-autoload --no-dev --optimize

RUN npm ci \
    && npm run build

FROM base AS production

COPY --from=build --chown=www-data:www-data /app /app
COPY Caddyfile /etc/frankenphp/Caddyfile

RUN mkdir -p /config/caddy /data/caddy \
    && chown -R www-data:www-data /config/caddy /data/caddy \
    && chmod -R ug+rwX storage bootstrap/cache

ENV PORT=8080 \
    APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    QUEUE_CONNECTION=sync \
    INERTIA_SSR_ENABLED=false

USER www-data

EXPOSE 8080

CMD ["frankenphp", "run", "--config", "/etc/frankenphp/Caddyfile"]