FROM node:14-alpine

ENV FC_LANG en-US
ENV LC_CTYPE en_US.UTF-8
ARG NODE_ENV=dev
ARG PORT=6363
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# dependencies
#RUN echo -e "http://nl.alpinelinux.org/alpine/v3.10/main\nhttp://nl.alpinelinux.org/alpine/v3.10/community" > /etc/apk/repositories
RUN apk --no-cache add --update bash curl wget git --virtual .gyp python make g++

WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", ".env", "./"]
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && mv node_modules ./
COPY . .
CMD ["npm", "run","start"]
EXPOSE ${PORT}
