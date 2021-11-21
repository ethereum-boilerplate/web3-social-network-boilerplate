from brownie import accounts, Decentradit

def main():
    decentradit = Decentradit.deploy({"from":accounts[0]})
    tx_post1 = decentradit.createPost("","https://ipfs.moralis.io:2053/ipfs/QmUfpsyqc4hwozotRo4woyi5fJqvfcej5GcFvKiWoY6xr6","0x343bd96726eafbec90434b4cd3965095a0bb78111c59eba1b76fc749e1727f3a",{"from":accounts[0]})
    postId_1 = tx_post1.events["PostCreated"]["postId"]
    tx_post2 = decentradit.createPost(postId_1,"https://ipfs.moralis.io:2053/ipfs/QmUfpsyqc4hwozotRo4woyi5fJqvfcej5GcFvKiWoY6xr6","0x343bd96726eafbec90434b4cd3965095a0bb78111c59eba1b76fc749e1727f3a",{"from":accounts[1]})
    postId_2 = tx_post2.events["PostCreated"]["postId"]
    tx_vote1 = decentradit.voteUp(postId_1,1,{"from":accounts[1]})
    tx_vote2 = decentradit.voteUp(postId_1,1,{"from":accounts[2]})
    tx_vote3 = decentradit.voteUp(postId_1,1,{"from":accounts[3]})
    tx_vote3 = decentradit.voteUp(postId_1,1,{"from":accounts[4]})
    tx_vote4 = decentradit.voteUp(postId_2,2,{"from":accounts[0]})
    tx_vote5 = decentradit.voteDown(postId_2,1,{"from":accounts[2]})
    tx_vote6 = decentradit.voteDown(postId_2,1,{"from":accounts[3]})
    tx_vote7 = decentradit.voteDown(postId_2,1,{"from":accounts[4]})
    print(tx_vote6.events)