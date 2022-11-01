
function fromDB(user) {
    const userResponse = {
        id: user.id_user,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        gravatar: user.gravatar,
        address: {
            street: user.street,
            suite: user.suite,
            city: user.city,
            zipcode: user.zipcode,
            geo: {
                lat: user.lat,
                lng: user.lng
            }
        },
        company: {
            name: user.company_name,
            catchPhrase: user.catch_phrase,
            bs: user.bs
        }
    }

    return userResponse
}   

function fromData(user, company, address) {
    const userResponse = {
        id: user.id_user,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        gravatar: user.gravatar,
        address: {
            street: address.street,
            suite: address.suite,
            city: address.city,
            zipcode: address.zipcode,
            geo: {
                lat: address.lat,
                lng: address.lng
            }
        },
        company: {
            name: company.company_name,
            catchPhrase: company.catch_phrase,
            bs: company.bs
        }
    }
    return userResponse
}

module.exports = { fromDB, fromData }