'use strict';

/**
 * special handle in cluster
 */
export const master = {
  /**
   * get file by path
   */
  getFileByPath: (config, stc) => {
    let file = stc.resource.getFileByPath(config.file);
    return file.pathHistory;
  },
  /**
   * get or set cache
   */
  cache: (config, stc) => {
    let {key, name, value} = config;
    if(!(stc.cacheInstances[key])){
      stc.cacheInstances[key] = new stc.cache({
        onlyMemory: true
      });
    }
    let instance = stc.cacheInstances[key];
    if(value === undefined){
      return instance.get(name);
    }
    return instance.set(name, value);
  },
  /**
   * get file promise key & value
   */
  getFilePromise: async (config, stc) => {
    let file = await stc.getFileByPath(config.file);
    let data = file.promise(config.key);
    if(config.deferred){
      file.promise(config.key, undefined, 'set');
    }
    return data;
  },
  /**
   * resolve file deferred
   */
  resolveFilePromise: async (config, stc) => {
    let file = await stc.getFileByPath(config.file);
    file.promise(config.key, config.value, 'update');
  }
};

export const worker = {
  /**
   * get file ast
   */
  getAst: async (config, stc) => {
    let file = await stc.getFileByPath(config.file);
    file.setContent(config.content);
    return file.getAst();
  }
};
