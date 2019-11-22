import Vue from 'vue'
import Router from 'vue-router'
import StartSite from '@/components/StartSite'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import GroupManager from '@/components/GroupManager'
import GroupListing from '@/components/GroupListing'
import GroupCreator from '@/components/GroupCreator'
import Group from '@/components/Group'
import TaskManager from '@/components/TaskManager'
import TaskListing from '@/components/TaskListing'
import TaskCreator from '@/components/TaskCreator'
import Task from '@/components/Task'
import ExerciseListing from '@/components/ExerciseListing'
import ExerciseCreator from '@/components/ExerciseCreator'
import Exercise from '@/components/Exercise'
import TestListing from '@/components/TestListing'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: StartSite
    },
    {
      path: '/login',
      component: LoginForm
    },
    {
      path: '/register',
      component: RegisterForm
    },
    {
      path: '/groups',
      name: '/MyGroups',
      component: GroupManager,
      children: [
        {
          path: 'groups',
          name: 'GroupListing',
          component: GroupListing
        },
        {
          path: 'group/:name',
          name: 'GroupDetails',
          component: Group
        },
        {
          path: 'newGroup',
          name: 'GroupCreator',
          component: GroupCreator
        }
      ]
    },
    {
      path: '/tasks',
      name: 'MyTasks',
      component: TaskManager,
      children: [
        {
          path: 'tasks',
          name: 'TaskListing',
          component: TaskListing
        },
        {
          path: 'tasks/:pk',
          name: 'TaskDetails',
          component: Task
        },
        {
          path: 'newTask',
          component: TaskCreator
        },
        {
          path: 'exercises',
          component: ExerciseListing
        },
        {
          path: 'newExercise',
          component: ExerciseCreator
        },
        {
          path: 'exercise/:pk',
          name: 'ExerciseDetails',
          component: Exercise
        },        
        {
          path: 'tests',
          component: TestListing
        },
        {
          path: 'tests/:pk',
          name: 'TestDetails',
          component: Test
        }
      ]
    }
  ],
  mode: 'history'
})
