const urlPath = (path, req) => {
    path = ".." + path.slice(path.indexOf("/"))
    return path.replace("..", `${req.protocol}://${req.get('host')}`)
}

module.exports={
    urlPath,
}

    