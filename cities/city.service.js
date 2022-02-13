const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const City = db.City;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await City.find();
}

async function getById(id) {
    return await City.findById(id);
}

async function create(cityParam) {
    // validate
    if (await City.findOne({ 
        $and: [
            { name: cityParam.name },
            { date: cityParam.date }
        ]
    })) {
        throw 'A temperature has already been recorded for "' + cityParam.name + '" at "' + cityParam.date + '"';
    }

    const city = new City(cityParam);

    await city.save();
}

async function update(id, cityParam) {
    const city = await City.findById(id);

    if (!city) throw 'No City has been found with ID "' + id + '"';

    // copy cityParam properties to city
    Object.assign(city, cityParam);

    await city.save();
}

async function _delete(id) {
    await City.findByIdAndRemove(id);
}