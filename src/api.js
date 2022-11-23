// import axios from 'axios';

import { axios } from "./lib/axios"

export function createQuestion(data) {
  return axios.post(`questions`, data)
}

export function getQuestions() {
  return axios.get(`questions`)
}

export function getQuestion(questionId) {
  return axios.get(`questions/${questionId}`)
}

export function searchQuestion(questionText) {
  return axios.get(`questions?question_like=${questionText}`)
}

export function createTag(data) {
  return axios.post(`tags`, data)
}

export function searchTags(tagText) {
  return axios.get(`tags?name_like=${tagText}`)
}

export function getTags() {
  return axios.get(`tags`)
}


export function createPaper(paper) {
  return axios.post(`papers`, paper)
}

export function updatePaper(paper) {
  return axios.put(`papers/${paper.id}`, paper)
}

export function getPapers(paper) {
  return axios.get(`papers`);
}

export function getPaper(paperId) {
  return axios.get(`papers/${paperId}`);
}

export function searchPaper(paperName) {
  return axios.get(`papers?paperName_like=${paperName}`);
}

export function createPaperResponse(data) {
  return axios.post(`paperResponses`, data)
}

export function updatePaperResponse(data) {
  return axios.put(`paperResponses/${data.id}`, data)
}

export function getPaperResponse(id) {
  return axios.get(`paperResponses/${id}`)
}