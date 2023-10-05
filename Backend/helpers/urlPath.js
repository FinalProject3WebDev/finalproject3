const urlPath = (path, req) => {
    return `${req.protocol}://${req.get('host')}/` + path
}

module.exports={
    urlPath,
}

    