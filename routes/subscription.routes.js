import { Router} from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req, res) => {
    res.send({title:'Get all subscriptions details'})
})

subscriptionRouter.get('/:id',(req, res) => {
    res.send({title:'Get subscriptions details'})
})

subscriptionRouter.post('/:id',(req, res) => {
    res.send({title:'Create subscriptions'})
})

subscriptionRouter.put('/:id',(req, res) => {
    res.send({title:'Update subscriptions details'})
})

subscriptionRouter.delete('/:id',(req, res) => {
    res.send({title:'Delete subscriptions details'})
})

subscriptionRouter.get('/user/:id',(req, res) => {
    res.send({title:'Get all user subscriptions details'})
})

subscriptionRouter.put('/:id/cancel',(req, res) => {
    res.send({title:'Cancel subscriptions details'})
})

subscriptionRouter.get('/upcoming-renewals',(req, res) => {
    res.send({title:'Get upcoming renewals'})
})

export default subscriptionRouter;