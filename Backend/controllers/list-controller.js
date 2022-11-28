const lists = require('../models/list')

const addItem = async (req, res) => {
    const { text, undo } = req.body;
    // const text = req.body.text;
    // const undo = req.body.undo;
    let list
    try {
        list = new lists({
            text: text, undo: undo
        });
        await list.save()
    }
    catch (err) {
        console.log(err)
    }
    if (!list) {
        return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ list });
}

const deleteItem = async (req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
    let list
    try {
        list = await lists.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!list) {
        return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
}

const editItem = async (req, res) => {
    const id = req.params.id;
    const { text, undo } = req.body;
    let list;
    try {
        list = await lists.findByIdAndUpdate(id, {
            text, undo
        });
        list = await list.save();
    } catch (err) {
        console.log(err);
    }
    if (!list) {
        return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ list });
}

const getItems = async (req, res) => {
    let list;
    try {
        list = await lists.find();
    } catch (err) {
        console.log(err);
    }

    if (!list) {
        return res.status(404).json({ message: "No list found" });
    }
    return res.status(200).json({ list });

};

module.exports = {
    addItem,
    editItem,
    deleteItem,
    getItems
}

