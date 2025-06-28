import { Group, Session } from '../types';

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'SQL Warriors',
    points: 2500,
    character: { type: 'athletic-woman', expression: 'happy' },
    members: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'],
    transactions: [
      { id: '1', points: 100, reason: 'Completed first assignment', timestamp: new Date('2025-01-10'), type: 'add' },
      { id: '2', points: 150, reason: 'Excellent participation', timestamp: new Date('2025-01-12'), type: 'add' },
      { id: '3', points: -50, reason: 'Late submission', timestamp: new Date('2025-01-15'), type: 'deduct' }
    ]
  },
  {
    id: '2',
    name: 'Database Legends',
    points: 2200,
    character: { type: 'athletic-men', expression: 'focused' },
    members: ['Emma Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor'],
    transactions: [
      { id: '4', points: 120, reason: 'Outstanding query optimization', timestamp: new Date('2025-01-11'), type: 'add' },
      { id: '5', points: 80, reason: 'Helping team members', timestamp: new Date('2025-01-14'), type: 'add' }
    ]
  },
  {
    id: '3',
    name: 'Query Masters',
    points: 1950,
    character: { type: 'scholar', expression: 'thinking' },
    members: ['Ivy Rodriguez', 'Jack Chen', 'Kate Anderson', 'Liam Murphy'],
    transactions: [
      { id: '6', points: 90, reason: 'Creative solution approach', timestamp: new Date('2025-01-13'), type: 'add' },
      { id: '7', points: 110, reason: 'Best practice implementation', timestamp: new Date('2025-01-16'), type: 'add' }
    ]
  },
  {
    id: '4',
    name: 'Data Explorers',
    points: 1800,
    character: { type: 'trainer', expression: 'excited' },
    members: ['Mia Garcia', 'Noah Kim', 'Olivia White', 'Peter Jones'],
    transactions: [
      { id: '8', points: 85, reason: 'Consistent performance', timestamp: new Date('2025-01-12'), type: 'add' },
      { id: '9', points: 95, reason: 'Innovative thinking', timestamp: new Date('2025-01-17'), type: 'add' }
    ]
  },
  {
    id: '5',
    name: 'Join Specialists',
    points: 1650,
    character: { type: 'student', expression: 'breathing' },
    members: ['Quinn Davis', 'Ryan Thompson', 'Sophie Clark', 'Tyler Martinez'],
    transactions: [
      { id: '10', points: 75, reason: 'Good collaboration', timestamp: new Date('2025-01-14'), type: 'add' },
      { id: '11', points: 100, reason: 'Perfect attendance', timestamp: new Date('2025-01-18'), type: 'add' }
    ]
  },
  {
    id: '6',
    name: 'Schema Builders',
    points: 1400,
    character: { type: 'mentor', expression: 'happy' },
    members: ['Uma Patel', 'Victor Lopez', 'Wendy Chang', 'Xavier Reed'],
    transactions: [
      { id: '12', points: 60, reason: 'Good effort', timestamp: new Date('2025-01-15'), type: 'add' },
      { id: '13', points: 80, reason: 'Improvement shown', timestamp: new Date('2025-01-19'), type: 'add' }
    ]
  }
];

export const sessions: Session[] = [
  {
    id: 1,
    title: 'Session 1',
    date: '3rd July 2025',
    completed: false,
    topics: [
      'Navigating Metabase (Datalake, dwh_fitness_mart, membership_dim)',
      'SQL & it\'s flavours, DBMS, RDBMS',
      'Understanding Database & Schema',
      'Understanding ER Model: Entity, Keys, ERD\'s, Relationships & types, Data Integrity Constraints',
      'The SELECT & FROM statement',
      'SELECT: DISTINCT, Simple Arithmetic Operations, Simple Aggregations',
      'Calculated Fields - Binning - Case When Statement',
      'The WHERE clause'
    ]
  },
  {
    id: 2,
    title: 'Session 2',
    date: '10th July 2025',
    completed: false,
    topics: [
      'Operators (Arithmetic, Logical)',
      'Relational Operators: Conditional-- Single value( >, >=, <, <=, =, <>), Multi-value(IN, NOT IN ), BETWEEN, IS NULL, IS NOT NULL, LIKE with %, [] & _ for Wildcards.',
      'ORDER BY',
      'LIMIT',
      'Code Readability'
    ]
  },
  {
    id: 3,
    title: 'Session 3',
    date: '17th July 2025',
    completed: false,
    topics: [
      'Concept of Joins',
      'Intro to JOINS & Types (Inner, Left, Right, Full, Self, Cross)',
      'Usage of Joins',
      'Joining Multiple Tables',
      'Order of Execution'
    ]
  },
  {
    id: 4,
    title: 'Session 4',
    date: '24th July 2025',
    completed: false,
    topics: [
      'Aggregate Functions',
      'The GROUP BY Clause',
      'The HAVING Clause',
      'Order Of Execution (Revisit)'
    ]
  }
];

export const adminCredentials = {
  id: 'admin',
  password: 'sql2025'
};