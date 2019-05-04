FROM node:8
MAINTAINER Marion Dutu Launay <marion.dutulaunay@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system.
#
COPY src /opt/app/

ENTRYPOINT ["node", "/opt/app/musician.js"]