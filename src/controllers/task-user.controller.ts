import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
  User,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskUserController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/owner', {
    responses: {
      '200': {
        description: 'owner belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<User> {
    return this.taskRepository.owner(id);
  }

  @get('/tasks/{id}/creator', {
    responses: {
      '200': {
        description: 'creator belonging to Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getCreator(
    @param.path.string('id') id: typeof Task.prototype.id,
  ): Promise<User> {
    return this.taskRepository.creator(id);
  }
}
