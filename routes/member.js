const fs = require('fs');

module.exports = {
    addMemberPage: (req, res) => {
        res.render('add-member.ejs', {
            title: "Welcome to POC| Add Member"
            , message: ''
        });
    },
    addMember: (req, res) => {

        let message = '';
        let MemberId = req.body.member_id;
        let MemberName = req.body.member_name;
        let MemberSsn = req.body.member_ssn;
        let MemberDetails = req.body.member_details;
        
        let memberdataquery = "SELECT * FROM member WHERE MemberId = '" + MemberId + "'";

        db.query(memberdataquery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                    message = 'Member already exists';
                    res.render('add-member.ejs', {
                    message,
                    title: "Welcome to POC | Add Member"
                });
            }
            else
            {
               // Insert into the database
                let query = "INSERT INTO member (MemberId, MemberName, MemberSsn, MemberDetails) VALUES ('" + MemberId + "', '" + MemberName + "', '" + MemberSsn + "', '" + MemberDetails + "')";

               db.query(query, (err, result) => {
                   if (err)
                   {
                    return res.status(500).send(err);
                   }

                   res.redirect('/');
               });                    

            } 
        });
    },
    editMemberPage: (req, res) => {
        let Member_Id = req.params.MemberId;
        let query = "SELECT * FROM `member` WHERE MemberId = '" + Member_Id + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-member.ejs', {
                title: "Edit Member"
                , Member: result[0]
                , message: ''
            });
        });
    },
    editMember: (req, res) => {
        let MemberId = req.params.MemberId;
        let MemberName = req.body.member_name;
        let MemberSsn = req.body.member_ssn;
        let MemberDetails = req.body.member_details;

        let query = "UPDATE member SET MemberName = '" + MemberName + "', MemberSsn = '" + MemberSsn + "', MemberDetails = '" + MemberDetails + "' WHERE MemberId = '" + MemberId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteMember: (req, res) => {
        let MemberId = req.params.MemberId;
        let deleteMemberQuery = 'DELETE FROM member WHERE MemberId = "' + MemberId + '"';

        db.query(deleteMemberQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};