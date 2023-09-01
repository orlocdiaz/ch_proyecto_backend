async function render(render, res, manager) {
  try {
    const products = await manager.getAll();
    await res.render(render, products);
  } catch (error) {
    res.render('error', { message: error.message });
  }
}

module.exports = render;
