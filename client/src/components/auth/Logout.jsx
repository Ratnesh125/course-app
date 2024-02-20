function logout() {
    console.log("hhh")
    localStorage.removeItem('token');
    window.location.href = '/login';
}

logout();
