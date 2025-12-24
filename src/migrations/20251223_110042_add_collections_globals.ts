/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_menu_items_category" AS ENUM('tandoor', 'curries-veg', 'curries-nonveg', 'rice-biryani', 'breads', 'chinese', 'starters', 'soups-salads', 'desserts', 'beverages');
  CREATE TYPE "public"."enum_menu_items_cuisine" AS ENUM('north-indian', 'mughlai', 'chinese', 'continental', 'south-indian');
  CREATE TYPE "public"."enum_menu_items_dietary_info_spice_level" AS ENUM('mild', 'medium', 'hot', 'very-hot');
  CREATE TYPE "public"."enum_service_packages_type" AS ENUM('wedding', 'corporate', 'private-party', 'religious', 'birthday', 'festival', 'engagement', 'anniversary');
  CREATE TYPE "public"."enum_testimonials_event_type" AS ENUM('wedding', 'corporate', 'private-party', 'religious', 'birthday', 'anniversary', 'engagement', 'festival', 'other');
  CREATE TYPE "public"."enum_testimonials_rating" AS ENUM('5', '4', '3', '2', '1');
  CREATE TYPE "public"."enum_gallery_event_type" AS ENUM('wedding', 'corporate', 'private-party', 'religious', 'birthday', 'anniversary', 'engagement', 'festival', 'food', 'setup');
  CREATE TYPE "public"."enum_inquiries_services" AS ENUM('full-catering', 'live-counters', 'buffet', 'sit-down', 'staff', 'crockery', 'tent');
  CREATE TYPE "public"."enum_inquiries_event_type" AS ENUM('wedding', 'corporate', 'private-party', 'religious', 'birthday', 'anniversary', 'engagement', 'festival', 'other');
  CREATE TYPE "public"."enum_inquiries_budget" AS ENUM('under-50k', '50k-1l', '1l-2.5l', '2.5l-5l', 'above-5l', 'not-sure');
  CREATE TYPE "public"."enum_inquiries_menu_preference" AS ENUM('veg-only', 'nonveg-only', 'both', 'not-decided');
  CREATE TYPE "public"."enum_inquiries_source" AS ENUM('website', 'whatsapp', 'phone', 'referral', 'social', 'other');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'contacted', 'quote-sent', 'follow-up', 'converted', 'lost', 'closed');
  CREATE TYPE "public"."enum_homepage_why_choose_us_reasons_icon" AS ENUM('award', 'utensils', 'users', 'star', 'clock', 'shield', 'heart', 'check');
  CREATE TABLE "menu_items_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"name_hindi" varchar,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"category" "enum_menu_items_category" NOT NULL,
  	"cuisine" "enum_menu_items_cuisine" DEFAULT 'north-indian' NOT NULL,
  	"dietary_info_is_vegetarian" boolean DEFAULT false,
  	"dietary_info_is_vegan" boolean DEFAULT false,
  	"dietary_info_is_halal" boolean DEFAULT true,
  	"dietary_info_is_spicy" boolean DEFAULT false,
  	"dietary_info_spice_level" "enum_menu_items_dietary_info_spice_level",
  	"price" numeric,
  	"serving_size" varchar,
  	"featured" boolean DEFAULT false,
  	"ingredients" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "service_packages_included_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "service_packages_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "service_packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_service_packages_type" NOT NULL,
  	"short_description" varchar NOT NULL,
  	"full_description" jsonb,
  	"pricing_price_range_min" numeric NOT NULL,
  	"pricing_price_range_max" numeric,
  	"pricing_pricing_note" varchar,
  	"minimum_guests" numeric DEFAULT 50 NOT NULL,
  	"menu_options_vegetarian_items" numeric,
  	"menu_options_non_vegetarian_items" numeric,
  	"menu_options_dessert_items" numeric,
  	"menu_options_beverages" boolean DEFAULT true,
  	"menu_options_live_counters" boolean DEFAULT false,
  	"hero_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"client_name" varchar NOT NULL,
  	"company" varchar,
  	"event_type" "enum_testimonials_event_type" NOT NULL,
  	"quote" varchar NOT NULL,
  	"rating" "enum_testimonials_rating" DEFAULT '5' NOT NULL,
  	"client_photo_id" integer,
  	"event_date" timestamp(3) with time zone,
  	"venue" varchar,
  	"guest_count" numeric,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"event_type" "enum_gallery_event_type" NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar,
  	"event_date" timestamp(3) with time zone,
  	"venue" varchar,
  	"guest_count" numeric,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "inquiries_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_inquiries_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"event_type" "enum_inquiries_event_type" NOT NULL,
  	"event_date" timestamp(3) with time zone,
  	"guest_count" numeric,
  	"venue" varchar,
  	"budget" "enum_inquiries_budget",
  	"menu_preference" "enum_inquiries_menu_preference",
  	"message" varchar,
  	"source" "enum_inquiries_source" DEFAULT 'website',
  	"status" "enum_inquiries_status" DEFAULT 'new' NOT NULL,
  	"notes" varchar,
  	"assigned_to_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_certifications_other_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"number" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_name" varchar DEFAULT 'Ada-e-Haandi' NOT NULL,
  	"tagline" varchar DEFAULT 'Perfect Catered Affairs Since 1998' NOT NULL,
  	"description" varchar DEFAULT 'Premium North Indian catering services for weddings, corporate events, and private parties in Delhi-NCR. Serving authentic Mughlai cuisine since 1998.' NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"contact_primary_phone" varchar DEFAULT '+91-9999342322' NOT NULL,
  	"contact_secondary_phone" varchar DEFAULT '011-24672702',
  	"contact_whatsapp" varchar DEFAULT '+91-9999342322',
  	"contact_email" varchar DEFAULT 'info@adaehaandi.com' NOT NULL,
  	"address_street" varchar DEFAULT '141-142, South Moti Bagh Market',
  	"address_city" varchar DEFAULT 'New Delhi',
  	"address_state" varchar DEFAULT 'Delhi',
  	"address_pincode" varchar DEFAULT '110021',
  	"address_full_address" varchar DEFAULT '141-142, South Moti Bagh Market, New Delhi - 110021',
  	"address_google_maps_url" varchar,
  	"address_google_maps_link" varchar,
  	"business_hours_weekdays" varchar DEFAULT '10:00 AM - 8:00 PM',
  	"business_hours_saturday" varchar DEFAULT '10:00 AM - 8:00 PM',
  	"business_hours_sunday" varchar DEFAULT '10:00 AM - 6:00 PM',
  	"business_hours_note" varchar DEFAULT 'Available 24/7 for event inquiries',
  	"social_instagram" varchar,
  	"social_facebook" varchar,
  	"social_youtube" varchar,
  	"social_twitter" varchar,
  	"certifications_fssai_number" varchar,
  	"certifications_fssai_badge_id" integer,
  	"seo_meta_title" varchar DEFAULT 'Ada-e-Haandi | Premium North Indian Catering in Delhi-NCR',
  	"seo_meta_description" varchar DEFAULT 'Premium North Indian & Mughlai catering for weddings, corporate events & parties in Delhi-NCR. 27+ years of excellence. Request a quote today!',
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_why_choose_us_reasons_icon"
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline" varchar DEFAULT 'Perfect Catered Affairs' NOT NULL,
  	"hero_subheadline" varchar DEFAULT 'Premium North Indian Catering Since 1998',
  	"hero_description" varchar DEFAULT 'Serving authentic Mughlai cuisine for weddings, corporate events, and private parties across Delhi-NCR.',
  	"hero_background_image_id" integer,
  	"hero_primary_cta_text" varchar DEFAULT 'Get Quote',
  	"hero_primary_cta_link" varchar DEFAULT '/get-quote',
  	"hero_secondary_cta_text" varchar DEFAULT 'View Menu',
  	"hero_secondary_cta_link" varchar DEFAULT '/menu',
  	"featured_menu_section_title" varchar DEFAULT 'Signature Dishes',
  	"featured_menu_section_subtitle" varchar DEFAULT 'Our most loved preparations',
  	"services_section_title" varchar DEFAULT 'Our Services',
  	"services_section_subtitle" varchar DEFAULT 'Catering for every occasion',
  	"testimonials_section_title" varchar DEFAULT 'What Our Clients Say',
  	"testimonials_section_subtitle" varchar DEFAULT 'Trusted by thousands of happy customers',
  	"why_choose_us_section_title" varchar DEFAULT 'Why Choose Ada-e-Haandi?',
  	"cta_headline" varchar DEFAULT 'Ready to Create Your Perfect Event?',
  	"cta_subheadline" varchar DEFAULT 'Get a customized quote for your upcoming celebration',
  	"cta_button_text" varchar DEFAULT 'Request a Quote',
  	"cta_button_link" varchar DEFAULT '/get-quote',
  	"cta_background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"menu_items_id" integer,
  	"service_packages_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "navigation_main_menu_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "navigation_main_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false,
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_button_show" boolean DEFAULT true,
  	"cta_button_text" varchar DEFAULT 'Get Quote',
  	"cta_button_link" varchar DEFAULT '/get-quote',
  	"footer_text" varchar DEFAULT 'Ada-e-Haandi has been serving authentic North Indian cuisine for weddings, corporate events, and private parties since 1998. Based in South Delhi, we cater across Delhi-NCR.',
  	"copyright_text" varchar DEFAULT '© {year} Ada-e-Haandi. All rights reserved.',
  	"mobile_menu_show_phone" boolean DEFAULT true,
  	"mobile_menu_show_whats_app" boolean DEFAULT true,
  	"mobile_menu_show_social" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_packages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "inquiries_id" integer;
  ALTER TABLE "menu_items_images" ADD CONSTRAINT "menu_items_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_images" ADD CONSTRAINT "menu_items_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_packages_features" ADD CONSTRAINT "service_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_packages_included_items" ADD CONSTRAINT "service_packages_included_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_packages_gallery_images" ADD CONSTRAINT "service_packages_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_packages_gallery_images" ADD CONSTRAINT "service_packages_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_packages" ADD CONSTRAINT "service_packages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_client_photo_id_media_id_fk" FOREIGN KEY ("client_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_tags" ADD CONSTRAINT "gallery_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries_services" ADD CONSTRAINT "inquiries_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_certifications_other_certifications" ADD CONSTRAINT "site_settings_certifications_other_certifications_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_certifications_other_certifications" ADD CONSTRAINT "site_settings_certifications_other_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_certifications_fssai_badge_id_media_id_fk" FOREIGN KEY ("certifications_fssai_badge_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_stats" ADD CONSTRAINT "homepage_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us_reasons" ADD CONSTRAINT "homepage_why_choose_us_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_cta_background_image_id_media_id_fk" FOREIGN KEY ("cta_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_service_packages_fk" FOREIGN KEY ("service_packages_id") REFERENCES "public"."service_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main_menu_children" ADD CONSTRAINT "navigation_main_menu_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_main_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_main_menu" ADD CONSTRAINT "navigation_main_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "menu_items_images_order_idx" ON "menu_items_images" USING btree ("_order");
  CREATE INDEX "menu_items_images_parent_id_idx" ON "menu_items_images" USING btree ("_parent_id");
  CREATE INDEX "menu_items_images_image_idx" ON "menu_items_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "menu_items_slug_idx" ON "menu_items" USING btree ("slug");
  CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  CREATE INDEX "service_packages_features_order_idx" ON "service_packages_features" USING btree ("_order");
  CREATE INDEX "service_packages_features_parent_id_idx" ON "service_packages_features" USING btree ("_parent_id");
  CREATE INDEX "service_packages_included_items_order_idx" ON "service_packages_included_items" USING btree ("_order");
  CREATE INDEX "service_packages_included_items_parent_id_idx" ON "service_packages_included_items" USING btree ("_parent_id");
  CREATE INDEX "service_packages_gallery_images_order_idx" ON "service_packages_gallery_images" USING btree ("_order");
  CREATE INDEX "service_packages_gallery_images_parent_id_idx" ON "service_packages_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "service_packages_gallery_images_image_idx" ON "service_packages_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "service_packages_slug_idx" ON "service_packages" USING btree ("slug");
  CREATE INDEX "service_packages_hero_image_idx" ON "service_packages" USING btree ("hero_image_id");
  CREATE INDEX "service_packages_updated_at_idx" ON "service_packages" USING btree ("updated_at");
  CREATE INDEX "service_packages_created_at_idx" ON "service_packages" USING btree ("created_at");
  CREATE INDEX "testimonials_client_photo_idx" ON "testimonials" USING btree ("client_photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "gallery_tags_order_idx" ON "gallery_tags" USING btree ("_order");
  CREATE INDEX "gallery_tags_parent_id_idx" ON "gallery_tags" USING btree ("_parent_id");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "inquiries_services_order_idx" ON "inquiries_services" USING btree ("order");
  CREATE INDEX "inquiries_services_parent_idx" ON "inquiries_services" USING btree ("parent_id");
  CREATE INDEX "inquiries_assigned_to_idx" ON "inquiries" USING btree ("assigned_to_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE INDEX "site_settings_certifications_other_certifications_order_idx" ON "site_settings_certifications_other_certifications" USING btree ("_order");
  CREATE INDEX "site_settings_certifications_other_certifications_parent_id_idx" ON "site_settings_certifications_other_certifications" USING btree ("_parent_id");
  CREATE INDEX "site_settings_certifications_other_certifications_image_idx" ON "site_settings_certifications_other_certifications" USING btree ("image_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_certifications_certifications_fssai_badge_idx" ON "site_settings" USING btree ("certifications_fssai_badge_id");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "site_settings" USING btree ("seo_og_image_id");
  CREATE INDEX "homepage_stats_order_idx" ON "homepage_stats" USING btree ("_order");
  CREATE INDEX "homepage_stats_parent_id_idx" ON "homepage_stats" USING btree ("_parent_id");
  CREATE INDEX "homepage_why_choose_us_reasons_order_idx" ON "homepage_why_choose_us_reasons" USING btree ("_order");
  CREATE INDEX "homepage_why_choose_us_reasons_parent_id_idx" ON "homepage_why_choose_us_reasons" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_cta_cta_background_image_idx" ON "homepage" USING btree ("cta_background_image_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_menu_items_id_idx" ON "homepage_rels" USING btree ("menu_items_id");
  CREATE INDEX "homepage_rels_service_packages_id_idx" ON "homepage_rels" USING btree ("service_packages_id");
  CREATE INDEX "homepage_rels_testimonials_id_idx" ON "homepage_rels" USING btree ("testimonials_id");
  CREATE INDEX "navigation_main_menu_children_order_idx" ON "navigation_main_menu_children" USING btree ("_order");
  CREATE INDEX "navigation_main_menu_children_parent_id_idx" ON "navigation_main_menu_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_main_menu_order_idx" ON "navigation_main_menu" USING btree ("_order");
  CREATE INDEX "navigation_main_menu_parent_id_idx" ON "navigation_main_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_packages_fk" FOREIGN KEY ("service_packages_id") REFERENCES "public"."service_packages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");
  CREATE INDEX "payload_locked_documents_rels_service_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_packages_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menu_items_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_packages_included_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_packages_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inquiries_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inquiries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_certifications_other_certifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_why_choose_us_reasons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_main_menu_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_main_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "menu_items_images" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "service_packages_features" CASCADE;
  DROP TABLE "service_packages_included_items" CASCADE;
  DROP TABLE "service_packages_gallery_images" CASCADE;
  DROP TABLE "service_packages" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "gallery_tags" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "inquiries_services" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "site_settings_certifications_other_certifications" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "homepage_stats" CASCADE;
  DROP TABLE "homepage_why_choose_us_reasons" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "navigation_main_menu_children" CASCADE;
  DROP TABLE "navigation_main_menu" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_packages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_inquiries_fk";
  
  DROP INDEX "payload_locked_documents_rels_menu_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_service_packages_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_gallery_id_idx";
  DROP INDEX "payload_locked_documents_rels_inquiries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "menu_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_packages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "inquiries_id";
  DROP TYPE "public"."enum_menu_items_category";
  DROP TYPE "public"."enum_menu_items_cuisine";
  DROP TYPE "public"."enum_menu_items_dietary_info_spice_level";
  DROP TYPE "public"."enum_service_packages_type";
  DROP TYPE "public"."enum_testimonials_event_type";
  DROP TYPE "public"."enum_testimonials_rating";
  DROP TYPE "public"."enum_gallery_event_type";
  DROP TYPE "public"."enum_inquiries_services";
  DROP TYPE "public"."enum_inquiries_event_type";
  DROP TYPE "public"."enum_inquiries_budget";
  DROP TYPE "public"."enum_inquiries_menu_preference";
  DROP TYPE "public"."enum_inquiries_source";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_homepage_why_choose_us_reasons_icon";`)
}
