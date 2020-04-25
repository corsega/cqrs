export default class EventDispatcherResponse<Response> {
  [eventClassName: string]: Response;
}
