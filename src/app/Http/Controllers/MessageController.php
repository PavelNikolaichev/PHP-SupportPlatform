<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $messages = Message::all();

        return response()->json($messages, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreMessageRequest $request
     * @return JsonResponse
     */
    public function store(StoreMessageRequest $request): JsonResponse
    {
        // check whether the ticket is related to the user
//        $ticket = Tickets::find($request->ticket_id);
//        if ($ticket->status === 'resolved') {
//            return response()->json(['error' => 'Ticket is resolved'], 403);
//        }
//        if ($ticket->user_id !== Auth::user()->id || !Auth::user()->is_suport) {
//            return response()->json(['error' => 'Unauthorized'], 401);
//        }
        $requestParams = $request->all();
        $requestParams += ['user_id' => Auth::user()->id];

        $message = Message::create($requestParams);

        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Message $message
     * @return Message
     */
    public function show(Message $message): Message
    {
        return $message;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateMessageRequest $request
     * @param Message $message
     * @return JsonResponse
     */
    public function update(UpdateMessageRequest $request, Message $message): JsonResponse
    {
        $message->update($request->all());
        return response()->json($message, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Message $message
     * @return JsonResponse
     */
    public function destroy(Message $message): JsonResponse
    {

        // check if user has the specified rights to delete the ticket or is the author of the ticket.
        // if everything ok - go on.
        // otherwise response with an error
        $message->delete();

        return response()->json(null, 204);
    }
}
