composer identity issue -c admin@block_chain-interface_4 -f ./dist/user1.card -u user1 -a "resource:org.sysu.wf.Member#user1"
composer identity issue -c admin@block_chain-interface_4 -f ./dist/user2.card -u user2 -a "resource:org.sysu.wf.Member#user2"
composer identity issue -c admin@block_chain-interface_4 -f ./dist/user3.card -u user3 -a "resource:org.sysu.wf.Member#user3"
composer card delete --card user1@block_chain-interface_4
composer card delete --card user2@block_chain-interface_4
composer card delete --card user3@block_chain-interface_4
composer card import -f ./dist/user1.card
composer card import -f ./dist/user2.card
composer card import -f ./dist/user3.card