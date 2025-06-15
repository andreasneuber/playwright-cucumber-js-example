FROM mcr.microsoft.com/playwright:v1.53.0-noble

WORKDIR /app
ENV PATH="/app/node_modules/.bin:$PATH"

COPY package.json /app/
RUN npm install --no-cache

COPY acceptance/ /app/acceptance/
COPY reports/ /app/reports/
COPY cucumber.conf.js /app/
COPY cucumber_report.json /app/
COPY reporter.js /app/

RUN npx playwright install-deps
