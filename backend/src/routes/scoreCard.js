import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

router.delete("/clear", (_, res) => { //Clear
    const Clear = async () => {
        await ScoreCard.deleteMany({})
        res.json({message: 'Database cleared'})
    }

    Clear()
});

router.post("/add", (req, res) => { //Add
    const nm = req.body.name
    const sb = req.body.subject
    const sc = req.body.score

    const Add = async () => {
        const query = await ScoreCard.findOne({name: nm, subject: sb})

        if (query) {
            await ScoreCard.deleteOne({name: nm, subject: sb})
            const newCard = new ScoreCard ({name: nm, subject: sb, score: sc})
            newCard.save()
            const msg = 'Updating (' + nm + ', ' + sb + ', ' + sc + ')'
            res.json({message: msg, card: newCard})
        }
        else {
            const newCard = new ScoreCard ({name: nm, subject: sb, score: sc})
            newCard.save()
            const msg = 'Adding (' + nm + ', ' + sb + ', ' + sc + ')'
            res.json({message: msg, card: newCard})
        }
    }
    
    Add()
});

router.get("/query", (req, res) => { //Query 
    const type = req.query.type
    const str = req.query.queryString

    const Query = async () => {
        if (type === 'name'){
            const query = await ScoreCard.find({name: str})
            if (query.length > 0) {
                const msg = new Array(query.length)
                for(let i=0; i<query.length; i++){
                    msg[i] = 'Found card with name: (' + query[i].name + ', ' + query[i].subject + ', ' + query[i].score + ')'
                }
                // console.log(query)
                res.json({messages: msg, message: ''})
            }
            else {
                const msg = new Array(1)
                msg[0] = 'Name(' + str + ')' + 'not found!'
                res.json({messages: msg, message: ''})
            }
        }
        else{ //query type: subject
            const query = await ScoreCard.find({subject: str})
            if (query.length > 0) {
                const msg = new Array(query.length)
                for(let i=0; i<query.length; i++){
                    msg[i] = 'Found card with subject: (' + query[i].name + ', ' + query[i].subject + ', ' + query[i].score + ')'
                }
                // console.log(query)
                res.json({messages: msg, message: ''})
            }
            else {
                const msg = new Array(1)
                msg[0] = 'Subject(' + str + ')' + 'not found!'
                res.json({messages: msg, message: ''})
            }
        }
    }

    Query()
});

export default router;
 