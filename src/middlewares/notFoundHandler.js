export const notFoundHandler = (req, res)=> {
    req.status(404).json({
        status: 404,
        message: `Route not found`,
    });
};
