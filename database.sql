CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"user_name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"plan_status" BOOLEAN NOT NULL,
	"plan_id" integer,
	"full_user_name" TEXT,
	"address" TEXT,
	"cep" TEXT,
	"city" TEXT,
	"state" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
);

CREATE TABLE "sessions" (
	"session_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("session_id")
);

CREATE TABLE "plans" (
	"plan_id" serial NOT NULL,
	"plan_type" TEXT NOT NULL,
	"delivery_day" integer NOT NULL,
	"created_date" timestamp with time zone NOT NULL DEFAULT 'now()',
	CONSTRAINT "plans_pk" PRIMARY KEY ("plan_id")
);

CREATE TABLE "deliveries" (
	"delivery_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"delivery_date" timestamp with time zone NOT NULL,
	CONSTRAINT "deliveries_pk" PRIMARY KEY ("delivery_id")
);

CREATE TABLE "products" (
	"product_id" integer NOT NULL,
	"product_name" TEXT NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("product_id")
);

CREATE TABLE "product_user" (
	"product_user_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	CONSTRAINT "product_user_pk" PRIMARY KEY ("product_user_id")
);

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("plan_id") REFERENCES "plans"("plan_id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");

ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");

ALTER TABLE "product_user" ADD CONSTRAINT "product_user_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "product_user" ADD CONSTRAINT "product_user_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("product_id");
