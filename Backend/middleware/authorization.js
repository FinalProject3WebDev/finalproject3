function isAdmin(req, res, next) {
  // Pastikan objek user ada dalam res.locals
  const user = res.locals.user;

  // Periksa apakah pengguna memiliki peran 'admin'
  if (user && user.role === 'admin') {
    // Jika iya, lanjutkan ke rute berikutnya
    next();
  } else {
    res.status(403).json({ message: 'Permission denied from authorization' });
  }
}

module.exports = { isAdmin };

