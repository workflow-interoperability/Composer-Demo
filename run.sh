composer card create -p config/connection.json -u PeerAdmin -c config/Admin@org1.example.com-cert.pem -k config/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
composer card import -f PeerAdmin@block_chain-interface_4.card
npm run prepublish && npm run deploy && npm run start && npm run import && npm run ping
