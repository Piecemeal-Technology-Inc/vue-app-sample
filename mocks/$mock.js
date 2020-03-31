/* eslint-disable */
import mockServer from 'axios-mock-server'
import mock0 from './joho/_id'
import mock1 from './joho'

export default (client) => mockServer([
  {
    path: '/joho/_id',
    methods: mock0
  },
  {
    path: '/joho',
    methods: mock1
  }
], client, '')
