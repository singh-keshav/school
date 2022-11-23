import _axios from "axios";
import { baseApiPath, shouldPersistData } from "../config";

const db = {};



const InMemoryDBApi = {
  async post(relativePath, payload, config) {
    const entityName = String(relativePath).split('/')[0];
    let id = 1;
    if (!db[entityName]) {
      db[entityName] = [];
    }
    const documents = db[entityName];
    const lastEntry = documents[documents.length - 1];

    if (lastEntry) {
      id = lastEntry.id + 1;
    };

    payload.id = id;
    payload.createdAt = Date.now();
    documents.push(payload);
    return { status: 200, data: payload };
  },

  async put(relativePath, payload, config) {
    const [entityName, documentId] = String(relativePath).split('/');

    if (!db[entityName]) {
      return Promise.reject({ status: 400, data: { message: 'Unknow Id' } })
    }
    let documents = db[entityName];
    const doc = documents.find(_doc => String(_doc.id) === String(documentId));

    payload.updatedAt = Date.now();
    payload.id = documentId;
    payload.createdAt = doc.createdAt;
    db[entityName] = documents.map(_doc => _doc => String(_doc.id) === String(documentId) ? payload : _doc);

    return { status: 200, data: payload };
  },

  async get(relativePath, config) {
    if (String(relativePath).includes('/')) {
      //qustion/:id
      const [entityName, targetDocId] = String(relativePath).split('/');
      let documents = db[entityName];

      console.log(documents, entityName, targetDocId)

      const doc = documents.find(_doc => String(_doc.id) === String(targetDocId));
      return { status: 200, data: doc }
    } else if (String(relativePath).includes('?')) {
      // qustion?title_like=abc
      const operators = [
        {
          name: 'like',
          checker: function (value, searchValue) {
            return String(value).toLocaleLowerCase().includes(String(searchValue).toLocaleLowerCase());
          }
        }
      ];

      const [entityName, searchQuery] = String(relativePath).split('?');
      if (!db[entityName]) {
        return Promise.reject({ status: 400, data: { message: 'unknown entity' } })
      }
      let documents = db[entityName];
      const queries = searchQuery.split('&');

      for (const query of queries) {
        let [propertyName, operatorName, searchValue] = query.split(/[=,_]/);
        const operator = operators.find(op => op.name === operatorName);
        if (!operator) {
          return Promise.reject({ status: 400, message: 'unknown operator' });
        }

        const checker = operator.checker;
        documents = documents.filter(_doc => _doc[propertyName] && checker(_doc[propertyName], searchValue));
      }

      return { status: 200, data: documents };
    } else {
      // question
      const entityName = relativePath;
      let documents = db[entityName];
      if (!db[entityName]) {
        return Promise.reject({ status: 400, data: { message: 'Unknow Id' } })
      }
      return { status: 200, data: documents }
    }
  },
}

const PersistentDbApi = _axios.create({
  baseURL: baseApiPath
})


export const axios = shouldPersistData ? PersistentDbApi : InMemoryDBApi;

// const axios = InMemoryDBApi;



// async function main() {
//   let response;
//   try {

//     response = await axios.post('question', { title: "first title", text: 'first question' });
//     response = await axios.post('question', { title: "Second Title", text: 'first question' });
//     console.log('post request response', response);
//     response = await axios.get('question');
//     console.log('get resposne ', response)
//     response = await axios.get('question?title_like=se');
//     console.log('serach response', response)

//   } catch (error) {
//     console.error(error);
//   }
// }

// main();