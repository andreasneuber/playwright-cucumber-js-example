FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app
ENV PATH="/app/node_modules/.bin:$PATH"

COPY package.json package-lock.json /app/
RUN npm ci

COPY tsconfig.json config.ts global.d.ts cucumber.conf.ts reporter.ts /app/
COPY acceptance/ /app/acceptance/
COPY reports/ /app/reports/

RUN npm run build

RUN npx playwright install-deps
