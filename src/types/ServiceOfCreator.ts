import Service from '@/src/types/Service'

export default interface ServiceOfCreator {
  id: number
  serviceId: number
  service: Service
  creatorId: number
  price: number
}
