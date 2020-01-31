var domain = "https://api.myfacilities.online"

function login_api() {
    return domain+"/login"
}

function user_api() {
    return domain+"/user"
}

function refresh_api() {
    return domain+"/refresh"
}

function organizations_api() {
    return domain+"/organizations"
}

function organization_api() {
    return domain+"/organization"
}

function inventories_api() {
    return organization_api() + "/inventories"
}

function inventory_api() {
    return organization_api() + "/inventory"
}

function members_api() {
    return organization_api() + "/members"
}

function tasks_api() {
    return inventory_api() + "/tasks"
}

export {login_api};
export {user_api};
export {refresh_api};
export {organizations_api};
export {organization_api};
export {inventories_api};
export {inventory_api};
export {members_api}
export {tasks_api};