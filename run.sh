# Creating business network cards for the Hyperledger Fabric administrator
composer card create -p ./config/org1/org1.json -u PeerAdmin -c ./config/org1/Admin@org1.example.com-cert.pem -k ./config/org1/70dbff18da3805c9aca741757f3d5f9d926e234e54d892a1e2a50fa8c6f31a88_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@block_chain-interface_4-org1.card
composer card create -p ./config/org2/org2.json -u PeerAdmin -c ./config/org2/Admin@org2.example.com-cert.pem -k ./config/org2/5baf8839988da107ada68164acd82e775ec2bde9542bd497117377d0376478a2_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@block_chain-interface_4-org2.card

# Importing the business network cards for the Hyperledger Fabric administrator
composer card import -f PeerAdmin@block_chain-interface_4-org1.card --card PeerAdmin@block_chain-interface_4-org1
composer card import -f PeerAdmin@block_chain-interface_4-org2.card --card PeerAdmin@block_chain-interface_4-org2

npm run prepublish

# Installing the business network onto the Hyperledger Fabric peer nodes
composer network install --card PeerAdmin@block_chain-interface_4-org1 --archiveFile ./dist/block_chain-interface_4.bna
composer network install --card PeerAdmin@block_chain-interface_4-org2 --archiveFile ./dist/block_chain-interface_4.bna

# Retrieving business network administrator certificates
composer identity request -c PeerAdmin@block_chain-interface_4-org1 -u admin -s adminpw -d ./config/org1/alice
composer identity request -c PeerAdmin@block_chain-interface_4-org2 -u admin -s adminpw -d ./config/org2/bob

# Starting the business network
composer network start -c PeerAdmin@block_chain-interface_4-org1 -n block_chain-interface_4 -V 0.0.1 -o endorsementPolicyFile=./config/endorsement-policy.json -A alice -C ./config/org1/alice/admin-pub.pem -A bob -C ./config/org2/bob/admin-pub.pem

# Creating a business network card to access the business network
composer card create -p ./config/org1/org1.json -u alice -n block_chain-interface_4 -c ./config/org1/alice/admin-pub.pem -k ./config/org1/alice/admin-priv.pem
composer card create -p ./config/org2/org2.json -u bob -n block_chain-interface_4 -c ./config/org2/bob/admin-pub.pem -k ./config/org2/bob/admin-priv.pem

composer card import -f alice@block_chain-interface_4.card
composer card import -f bob@block_chain-interface_4.card
