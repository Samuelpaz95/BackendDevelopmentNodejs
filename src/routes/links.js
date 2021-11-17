const { response } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();

const db = require('../database');
const { isLoggedIn } = require('../lib/auth');

// READING
router.get('/', isLoggedIn, async (request, response) => {
    const { id } = request.user;
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [id]);
    response.render('links/list', { links });
});

// CREATING 
router.get('/add', isLoggedIn, (request, response) => {
    response.render('links/add');
});

router.post('/add', isLoggedIn, async (request, response) => {
    const { title, lurl, descrip } = request.body;
    const newLink = {
        title, lurl, descrip, user_id: request.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    request.flash('success', "Link saved successfully");
    response.redirect('/links');
});

// DELETE
router.get('/delete/:id', isLoggedIn, async (request, response) => {
    const { id } = request.params;
    const user_id = request.user.id;
    await pool.query('DELETE FROM links WHERE id = ? and user_id = ?', [id, user_id]);
    response.redirect('/links');
});

// EDITION
router.get('/edit/:id', isLoggedIn, async (request, response) => {
    const { id } = request.params;
    const user_id = request.user.id;
    const links = await pool.query('SELECT * FROM links WHERE id = ? and user_id = ?', [
        id, user_id
    ]);
    if (links.length > 0) {
        response.render('links/edit', { link: links[0] });
    } else {
        response.redirect('/links');
    }
});
router.post('/edit/:id', isLoggedIn, async (request, response) => {
    const { id } = request.params;
    const user_id = request.user.id;
    const { title, lurl, descrip } = request.body;
    const newLink = {
        title, lurl, descrip, user_id
    };
    await pool.query('UPDATE links set ? WHERE id = ? and user_id = ?', [newLink, id, user_id]);
    response.redirect('/links');
});

module.exports = router