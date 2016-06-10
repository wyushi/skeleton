docker run -it -p 3000:3000 -v `pwd`:/src/code --link some-redis:redis --name some-api -d node-dev /bin/bash
