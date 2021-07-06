FROM ubuntu:latest

LABEL maintainer="ani@arishtisecurity.com"

#run stuffs
RUN apt-get update && apt-get upgrade -y
RUN apt-get update && DEBIAN_FRONTEND="noninteractive" TZ="America/New_York" apt-get install -y tzdata

# Install NGINX to test.
RUN apt-get install git -y
RUN apt-get install nginx -y

RUN rm -rf /var/www/html
RUN git clone https://github.com/ZeroBitSolutions/lab-ping.git /var/www/html
# Expose port 80
EXPOSE 8000
 
#
# Last is the actual command to start up NGINX within our Container
CMD ["nginx", "-g", "daemon off;"]
