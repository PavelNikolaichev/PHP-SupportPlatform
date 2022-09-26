<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketsRequest;
use App\Http\Requests\UpdateTicketsRequest;
use App\Models\Tickets;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        if (Auth::user()->is_support) {
            $tickets = Tickets::with('username:id,name')->get();
        } else {
            $tickets = Tickets::with('username:id,name')->where('user_id', Auth::id())->get();
        }

        return response()->json($tickets, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTicketsRequest $request
     * @return JsonResponse
     */
    public function store(StoreTicketsRequest $request): JsonResponse
    {
        $requestParams = $request->all();
        $requestParams += ['user_id' => Auth::user()->id];
        $requestParams += ['status' => 'in progress'];

        $ticket = (Tickets::create($requestParams))->load('username:id,name');

        return response()->json($ticket, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Tickets $ticket
     * @return JsonResponse
     */
    public function show(Tickets $ticket): JSONResponse
    {
        if ($ticket->user_id !== Auth::user()->id && !Auth::user()->is_support) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $ticket = $ticket->load('username:id,name', 'messages');
        return response()->json($ticket, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateTicketsRequest $request
     * @param Tickets $ticket
     * @return JsonResponse
     */
    public function update(UpdateTicketsRequest $request, Tickets $ticket): JsonResponse
    {
        if (!Auth::user()->is_support) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $data = array_intersect_key($request->all(), array_flip(['status', 'title']));
        if ($request->title === null) {
            unset($data['title']);
        }
        if ($request->status === null) {
            unset($data['status']);
        }

        if (empty($data)) {
            return response()->json(['message' => 'No data to update'], 400);
        }

        $ticket->update($data);

        return response()->json($ticket->load('username:id,name'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Tickets $ticket
     * @return JsonResponse
     */
    public function destroy(Tickets $ticket): JsonResponse
    {
        if (!Auth::user()->is_support && !($ticket->user_id === Auth::user()->id)) {
            return response()->json(['message' => 'You are not allowed to delete this ticket'], 403);
        }

        $ticket->delete();

        return response()->json(null, 204);
    }
}
