echo "Generating self-signed certificates ..."
mkdir ../server-side/ssl/
openssl genrsa -out ../server-side/ssl/key.pem -aes256 1024
openssl req -new -key ../server-side/ssl/key.pem -out ../server-side/ssl/csr.pem
openssl x509 -req -days 9999 -in ../server-side/ssl/csr.pem -signkey ../server-side/ssl/key.pem -out ../server-side/ssl/cert.pem
rm ../server-side/ssl/csr.pem
chmod 600 ../server-side/ssl/key.pem ../server-side/ssl/cert.pem
