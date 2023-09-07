const MyError = require('../utils/myError');

class Manager {
  constructor(service) {
    this.service = service;
  }

  //* RETRIEVE PRODUCTS
  //* ALL
  getAll = async (sort) => {
    const items = await this.service.get(null, null, sort);
    return items;
  };

  getLimited = async (findParams, limit, URL) => {
    const findURL = new URLSearchParams(findParams).toString();
    //* Make findParams case insensitive
    for (const key in findParams) {
      findParams[key] = { $regex: findParams[key], $options: 'i' };
    }

    const items = await this.service.get(findParams, limit);
    if (!parseInt(limit.page) || parseInt(limit.page) > items.totalPages) {
      throw new MyError(
        404,
        'Not Found',
        `Page ${limit.page} does not exist. Page limit is ${items.totalPages}`
      );
    } else {
      const prevLimit = {
        limit: limit.limit,
        page: items.hasPrevPage && parseInt(limit.page) - 1,
      };
      const nextLimit = {
        limit: limit.limit,
        page: items.hasNextPage && parseInt(limit.page) + 1,
      };
      if (limit.sort) {
        const sort = Object.values(limit.sort);
        (prevLimit.sort = sort), (nextLimit.sort = sort);
      }
      const prevLink = `${URL}?${new URLSearchParams(prevLimit).toString()}${
        findURL && '&' + findURL
      }`;
      const nextLink = `${URL}?${new URLSearchParams(nextLimit).toString()}${
        findURL && '&' + findURL
      }`;

      const { totalDocs, pagingCounter, ...result } = items;
      result.hasPrevPage && (result.prevLink = prevLink);
      result.hasNextPage && (result.nextLink = nextLink);

      return result;
    }
  };

  //*FOUND
  getFound = async (findParams, sort) => {
    const items = await this.service.get(findParams, null, sort);
    if (items || items.length) {
      return items;
    } else {
      throw new MyError(
        404,
        'Not Found',
        `Unable to find item with {id: ${findParams.id}}`
      );
    }
  };

  //* ADD PRODUCTS
  //* CHECK FOR REQUIRED FIELDS
  validateRequired = async (newItem, requiredFields) => {
    for (const field of requiredFields) {
      if (!newItem[field]) {
        throw new MyError(400, 'Required', `Missing required field: ${field}`);
      }
    }
  };

  //* CHECK FOR DUPLICATED
  validateDuplicated = async (newItem, duplicateValidations, id) => {
    for (const key of duplicateValidations) {
      const duplicated = await this.service.get({ [key]: newItem[key] });
      if (duplicated && duplicated.id !== id) {
        throw new MyError(
          400,
          'Duplicated',
          `The item with {${key}: ${newItem[key]}} already exists!`
        );
      }
    }
  };

  //* VALIDATE UPDATE
  validateUpdate = async (id, update) => {
    const item = await this.getFound(id);

    if (Object.keys(update).length > 0) {
      const updates = [];
      for (const key of Object.keys(update)) {
        updates.push(item[key] === update[key]);
      }
      if (!updates.includes(false)) {
        throw new MyError(
          200,
          'No Updates',
          `No new updates, item did not have any changes.`
        );
      }
    } else {
      throw new MyError(400, 'Empty', `Cannot read from empty update`);
    }
  };

  //* GENERATE ID
  generateId = async () => {
    const items = await this.getAll();
    let newId = 1;
    if (items.length) {
      const lastId = items[items.length - 1].id;
      newId += lastId;
    }
    return newId;
  };

  //* ADD
  add = async (item) => {
    const added = await this.service.add(item);
    return added;
  };

  //* ADD TO
  addTo = async (id, item) =>{
    const result = await this.service.addTo(id, item);
    return result;
  }

  //* DELETE FROM
  removeFrom = async (cid, pid) => {
    const result = await this.service.removeFrom(cid, pid);
    return result
  }
}

module.exports = Manager;
