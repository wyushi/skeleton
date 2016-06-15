echo "Generating self-signed certificates ..."
mkdir ./ssl/
openssl genrsa -out ./ssl/key.pem -aes256 1024
openssl req -new -key ./ssl/key.pem -out ./ssl/csr.pem
openssl x509 -req -days 9999 -in ./ssl/csr.pem -signkey ./ssl/key.pem -out ./ssl/cert.pem
rm ./ssl/csr.pem
chmod 600 ./ssl/key.pem ./ssl/cert.pem
