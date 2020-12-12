exports.excerpt = (post, limit= 20) => {
    const word = post.split(' ')
    return word.slice(0, limit - 1).join(' ') + ' ...'
}