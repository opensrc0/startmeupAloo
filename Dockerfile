WORKDIR /src
ADD . .
RUN npm install
EXPOSE 80
CMD ["npm", "run", "start:prod"]
