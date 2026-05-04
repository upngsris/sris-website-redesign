import { type SchemaTypeDefinition } from 'sanity'
import currentExecutive from './currentExecutive'
import commitee from './commitee'
import coordinator from './coordinator'
import event from './event'
import news from './news'
import project from './project'
import heroCarousel from './heroCarousel'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [currentExecutive, commitee, coordinator, event, news, project, heroCarousel],
}
