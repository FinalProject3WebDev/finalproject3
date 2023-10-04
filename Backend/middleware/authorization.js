function isAdmin(req, res, next) {
  const user = res.locals.user;
  console.log('User:', user);

  // periksa apakah pengguna memiliki peran 'admin'
  if (user && user.role === 'admin') {
    // jika iya, lanjutkan ke route berikutnya
    next();
  } else {
    res.status(403).json({ message: 'Permission denied from authorization' });
  }
}

module.exports = { isAdmin };

