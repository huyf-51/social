import { SetMetadata } from "@nestjs/common"
import { Type } from "../enum/notification-type.enum"

export const NOTIFICATION_TYPE_KEY = 'types'
export const Types = (...types: Type[]) => SetMetadata(NOTIFICATION_TYPE_KEY, types)